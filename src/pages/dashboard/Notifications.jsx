import React, { useMemo, useState } from 'react'

import Icon from '../../components/common/Icon'

const Notifications = () => {
  const initialNotifications = useMemo(() => ([
    {
      id: 'notif-1',
      category: 'Collab requests',
      title: 'Nimbus School accepted your invite',
      description: 'Climate Action Makeathon collaboration is now active.',
      time: '2h ago',
      read: false
    },
    {
      id: 'notif-2',
      category: 'Wall interactions',
      title: 'Rohit commented on your post',
      description: 'Asked about volunteer rosters for Hack Sprint.',
      time: '4h ago',
      read: false
    },
    {
      id: 'notif-3',
      category: 'Event updates',
      title: 'AI Hack Sprint registrations crossed 250',
      description: 'Auto-notify mentors about new cohort size.',
      time: '1d ago',
      read: true
    }
  ]), [])

  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeCategory, setActiveCategory] = useState('All')

  const markNotificationRead = (notificationId) => {
    setNotifications((previous) => previous.map((notification) => (
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    )))
  }

  const markCategoryNotificationsRead = (category) => {
    setNotifications((previous) => previous.map((notification) => (
      !category || notification.category === category
        ? { ...notification, read: true }
        : notification
    )))
  }

  const categories = useMemo(() => {
    const grouped = notifications.reduce((accumulator, notification) => {
      const key = notification.category
      accumulator[key] = accumulator[key] ? accumulator[key] + 1 : 1
      return accumulator
    }, {})
    return ['All', ...Object.keys(grouped)]
  }, [notifications])

  const filteredNotifications = useMemo(() => {
    if (activeCategory === 'All') return notifications
    return notifications.filter((notification) => notification.category === activeCategory)
  }, [activeCategory, notifications])

  const unreadCountForCategory = useMemo(() => {
    const counts = notifications.reduce((accumulator, notification) => {
      if (!notification.read) {
        accumulator.total += 1
        accumulator[notification.category] = (accumulator[notification.category] || 0) + 1
      }
      return accumulator
    }, { total: 0 })
    return counts
  }, [notifications])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 p-8 text-white shadow-lg">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">Stay in the loop</p>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Track invites, approvals, collaboration activity, and campus alerts as soon as they land.
          </p>
        </div>
        {unreadCountForCategory.total > 0 && (
          <button
            type="button"
            onClick={() => markCategoryNotificationsRead(activeCategory === 'All' ? null : activeCategory)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/30"
          >
            <Icon name="check" className="h-4 w-4" />
            Mark {activeCategory === 'All' ? 'all unread' : 'category unread'} as read
          </button>
        )}
      </header>

      <section className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const unread = category === 'All'
            ? unreadCountForCategory.total
            : unreadCountForCategory[category] || 0
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                  : 'bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-200 dark:hover:bg-slate-800'
              }`}
            >
              {category}
              {unread > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/90 px-1 text-xs font-semibold text-blue-600">
                  {unread}
                </span>
              )}
            </button>
          )
        })}
      </section>

      <section className="space-y-4">
        {filteredNotifications.map((notification) => (
          <article
            key={notification.id}
            className={`rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 ${
              notification.read ? 'border-gray-200/60 dark:border-slate-800/60' : 'border-blue-200/80 shadow-blue-100/50'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-blue-500 dark:text-blue-300">
                  <Icon name="notification" className="h-4 w-4" />
                  {notification.category}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => markNotificationRead(notification.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-700/70 dark:text-blue-200 dark:hover:bg-blue-900/30"
                >
                  <Icon name="check" className="h-4 w-4" />
                  Mark read
                </button>
              )}
            </div>
          </article>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-10 text-center text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-gray-400">
            You&apos;re all caught up. No notifications in this category.
          </div>
        )}
      </section>
    </div>
  )
}

export default Notifications
