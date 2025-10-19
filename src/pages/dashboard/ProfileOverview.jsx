import React, { useMemo, useState } from 'react'

import EditProfileModal from '../../components/dashboard/EditProfileModal'
import Icon from '../../components/common/Icon'
import { useAuth } from '../../hooks/useAuth'

const followingData = [
  { id: 'follow-1', name: 'Deccan Engineering College', descriptor: 'College partner', badge: 'College', icon: 'organization' },
  { id: 'follow-2', name: 'Mira Shah', descriptor: 'Startup programs lead', badge: 'College rep', icon: 'profile' },
  { id: 'follow-3', name: 'Northshore Institute of Design', descriptor: 'Design mentorship hub', badge: 'College', icon: 'creative' }
]

const collabRequestsData = [
  { id: 'request-1', name: 'Samaira N.', role: 'UI Lead • Pixelcraft Collective', time: '2h ago', icon: 'sparkles' },
  { id: 'request-2', name: 'Rohit Verma', role: 'Founder • Campus Innovators', time: '5h ago', icon: 'rocket' }
]

const postsData = [
  { id: 'post-1', title: 'Design jam: Sustainable campus mobility', status: 'Live now', metric: '1.4k views' },
  { id: 'post-2', title: 'Mentorship circle: Product thinking 101', status: 'Draft', metric: 'Updated 1 day ago' },
  { id: 'post-3', title: 'Open call: Campus storytellers', status: 'Scheduled', metric: 'Publishes Mar 28' }
]

const statsData = [
  { id: 'stat-1', label: 'Collaborations', value: '12' },
  { id: 'stat-2', label: 'Events hosted', value: '7' },
  { id: 'stat-3', label: 'Campus reach', value: '18 colleges' }
]

const teamsData = [
  { id: 'team-1', name: 'Campus Makers', role: 'Product lead', gradient: 'from-blue-600/80 to-indigo-600/80', icon: 'edit' },
  { id: 'team-2', name: 'Design Coalition', role: 'Visual strategy', gradient: 'from-purple-600/80 to-pink-500/80', icon: 'creative' },
  { id: 'team-3', name: 'Future Founders', role: 'Growth mentor', gradient: 'from-emerald-500/80 to-teal-500/80', icon: 'growth' }
]

const ListModal = ({ isOpen, onClose, title, description, items, renderItem }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl mx-4 sm:mx-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-lg" aria-hidden="true"></div>
        <div className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-[2rem] border border-white/30 bg-white/95 shadow-2xl dark:border-slate-800/80 dark:bg-slate-950/90">
          <div className="flex items-start justify-between gap-4 px-6 py-6 border-b border-blue-100/60 sm:px-8 dark:border-slate-800">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200/60 text-gray-400 transition hover:text-gray-600 dark:border-slate-800 dark:text-gray-300 dark:hover:text-white"
            >
              <Icon name="modalClose" className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 sm:px-8">
            {items.map(renderItem)}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileOverview = () => {
  const { user } = useAuth()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isFollowingOpen, setIsFollowingOpen] = useState(false)
  const [isCollabOpen, setIsCollabOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')

  const profile = useMemo(() => {
    const fallback = {
      name: 'Alex Carter',
      username: '@alexcarter',
      college: 'National Institute of Design',
      department: 'Department of Visual Communication • Year 3',
      bio: 'Product designer building inclusive experiences for student-led communities across campuses.',
      links: 'alexcarter.design, dribbble.com/alexcarter'
    }

    const rawLinks = (() => {
      if (Array.isArray(user?.links)) return user.links
      if (typeof user?.links === 'string' && user.links.trim().length > 0) {
        return user.links.split(',').map(link => link.trim()).filter(Boolean)
      }
      return fallback.links.split(',').map(link => link.trim())
    })()

    return {
      name: user?.name ?? fallback.name,
      username: user?.username ? (user.username.startsWith('@') ? user.username : `@${user.username}`) : fallback.username,
      college: user?.college ?? fallback.college,
      department: user?.department ?? fallback.department,
      bio: user?.bio ?? fallback.bio,
      links: rawLinks
    }
  }, [user])

  const handleModalClose = () => setIsEditOpen(false)

  return (
    <div className="relative mx-auto max-w-6xl space-y-8 px-2 sm:px-0">
      <section className="relative overflow-hidden rounded-[26px] border border-blue-100/70 bg-white/90 p-5 sm:p-6 shadow-lg shadow-blue-500/10 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/85 text-slate-900 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-50/70 via-white/60 to-purple-50/60 dark:from-slate-950/60 dark:via-slate-950/50 dark:to-slate-900/60" aria-hidden="true"></div>

        <div className="relative grid grid-cols-[minmax(88px,104px)_1fr] items-start gap-4 sm:grid-cols-[minmax(104px,140px)_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[minmax(140px,160px)_minmax(0,1fr)] lg:gap-8">
          <div className="relative h-24 w-24 overflow-hidden rounded-[26px] border border-blue-100 shadow-xl shadow-blue-500/20 sm:h-32 sm:w-32 sm:rounded-[32px] lg:h-36 lg:w-36 dark:border-slate-800">
            <img
              src={user?.profilePicture || '/default-avatar.png'}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                  {profile.username}
                </span>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{profile.name}</h1>
              </div>
              <a
                href="/dashboard/settings"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200/70 bg-white/80 text-blue-600 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 dark:border-slate-700 dark:bg-slate-900/80 dark:text-blue-200 sm:static sm:self-start"
                aria-label="Open dashboard settings"
              >
                <Icon name="settings" className="h-5 w-5" />
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-blue-600 dark:text-blue-200 sm:text-sm">
              <button
                type="button"
                onClick={() => setIsFollowingOpen(true)}
                className="inline-flex items-center gap-1"
              >
                <Icon name="follow" className="h-4 w-4" />
                {followingData.length} Following
              </button>
              <button
                type="button"
                onClick={() => setIsCollabOpen(true)}
                className="inline-flex items-center gap-1"
              >
                <Icon name="collabRequests" className="h-4 w-4" />
                {collabRequestsData.length} Collab
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100/70 bg-white px-3 py-1 text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200">
              <Icon name="marker" className="h-4 w-4" />
              {profile.college}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100/70 bg-white px-3 py-1 text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200">
              <Icon name="dept" className="h-4 w-4" />
              {profile.department}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200 sm:text-base">
            {profile.bio}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:w-72">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/50"
          >
            <Icon name="edit" className="h-4 w-4" />
            Edit profile
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50/60 dark:border-slate-700 dark:text-blue-200 dark:hover:bg-slate-900/60">
            <Icon name="shareProfile" className="h-4 w-4" />
            Share profile
          </button>
        </div>
      </section>

      <section className="rounded-[32px] border border-blue-100 bg-white/95 p-6 shadow-xl shadow-blue-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center justify-center gap-3 border-b border-blue-100/70 pb-4 text-sm font-semibold text-gray-500 dark:border-slate-800/70 dark:text-gray-400">
          {['posts', 'stats', 'teams'].map((tabKey) => {
            const isActive = activeTab === tabKey
            const label = tabKey.charAt(0).toUpperCase() + tabKey.slice(1)
            const iconMap = { posts: 'posts', stats: 'stats', teams: 'teams' }
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-blue-500/30'
                    : 'border border-blue-100 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50/60 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-200'
                }`}
              >
                <Icon name={iconMap[tabKey]} className="h-4 w-4" />
                {label}
              </button>
            )
          })}
        </div>

        <div className="mt-6">
          {activeTab === 'posts' && (
            <ul className="space-y-4">
              {postsData.map((post) => (
                <li key={post.id} className="rounded-2xl border border-blue-100 bg-white/70 px-4 py-4 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{post.metric}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-200">
                      <Icon name="signal" className="h-4 w-4" />
                      {post.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'stats' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {statsData.map((stat) => (
                <div key={stat.id} className="rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-6 text-center shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-xs uppercase tracking-wide text-blue-500 dark:text-blue-200">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {teamsData.map((team) => (
                <div
                  key={team.id}
                  className="relative overflow-hidden rounded-2xl border border-blue-100/70 px-4 py-4 text-white shadow-inner shadow-blue-500/10 dark:border-slate-800"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${team.gradient}`} aria-hidden="true"></div>
                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/20">
                          <Icon name={team.icon} className="h-4 w-4" />
                        </span>
                        {team.name}
                      </p>
                      <p className="text-xs text-white/80">{team.role}</p>
                    </div>
                    <button className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/20">
                      View room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={handleModalClose}
        profile={{
          name: profile.name,
          username: profile.username,
          college: profile.college,
          department: profile.department,
          bio: profile.bio,
          links: profile.links.join(', ')
        }}
      />

      <ListModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title="Following"
        description="People and campuses you keep up with."
        items={followingData}
        renderItem={(entity) => (
          <div
            key={entity.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-900/60 dark:text-blue-200">
                <Icon name={entity.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{entity.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{entity.descriptor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button className="rounded-full border border-blue-200 px-3 py-1 text-blue-600 transition hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:text-blue-200 dark:hover:bg-slate-800">
                View profile
              </button>
              <button className="rounded-full border border-blue-200 px-3 py-1 text-blue-500 transition hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-800">
                Unfollow
              </button>
            </div>
          </div>
        )}
      />

      <ListModal
        isOpen={isCollabOpen}
        onClose={() => setIsCollabOpen(false)}
        title="Collaboration requests"
        description="Manage new invites from student creators and college teams."
        items={collabRequestsData}
        renderItem={(request) => (
          <div
            key={request.id}
            className="rounded-2xl border border-blue-100 bg-white/70 px-4 py-4 shadow-inner shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-900/60 dark:text-blue-200">
                  <Icon name={request.icon} className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{request.name}</p>
                    <span className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{request.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{request.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <button className="rounded-full border border-blue-200 px-3 py-1 text-blue-600 transition hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:text-blue-200 dark:hover:bg-slate-800">
                  Message
                </button>
                <button className="rounded-full border border-blue-200 px-3 py-1 text-blue-500 transition hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-800">
                  Review request
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default ProfileOverview
