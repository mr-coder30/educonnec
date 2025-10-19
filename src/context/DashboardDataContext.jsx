import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const storageKey = 'collabhub_dashboard_state'

const initialFollowedItems = [
  {
    id: 'college-deccan-engineering-college',
    name: 'Deccan Engineering College',
    descriptor: 'College partner',
    badge: 'College',
    icon: 'organization',
    type: 'college',
    meta: { location: 'Hyderabad, India' }
  },
  {
    id: 'college-mira-shah',
    name: 'Mira Shah',
    descriptor: 'Startup programs lead',
    badge: 'College rep',
    icon: 'profile',
    type: 'person',
    meta: { organization: 'Campus Innovators' }
  },
  {
    id: 'college-northshore-institute-of-design',
    name: 'Northshore Institute of Design',
    descriptor: 'Design mentorship hub',
    badge: 'College',
    icon: 'creative',
    type: 'college',
    meta: { location: 'Chicago, USA' }
  }
]

const defaultState = {
  followedItems: initialFollowedItems
}

const DashboardDataContext = createContext(null)

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const DashboardDataProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultState
    const stored = window.localStorage.getItem(storageKey)
    const parsed = stored ? safeParse(stored) : null
    if (parsed && Array.isArray(parsed.followedItems)) {
      return {
        followedItems: parsed.followedItems
      }
    }
    return defaultState
  })
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  const dismissAlert = useCallback((alertId) => {
    setAlerts((previous) => previous.filter((alert) => alert.id !== alertId))
  }, [])

  const enqueueAlert = useCallback((alert) => {
    setAlerts((previous) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const nextAlert = { id, ...alert }
      const timeout = typeof alert.duration === 'number' ? alert.duration : 3200
      setTimeout(() => dismissAlert(id), timeout)
      return [...previous, nextAlert]
    })
  }, [dismissAlert])

  const isFollowing = useCallback((entityId) => {
    return state.followedItems.some((item) => item.id === entityId)
  }, [state.followedItems])

  const toggleFollow = useCallback((entity) => {
    if (!entity?.id) return
    let action = null
    setState((previous) => {
      const exists = previous.followedItems.some((item) => item.id === entity.id)
      let followedItems
      if (exists) {
        followedItems = previous.followedItems.filter((item) => item.id !== entity.id)
        action = { type: 'unfollow', name: entity.name }
      } else {
        const nextEntity = {
          id: entity.id,
          name: entity.name ?? 'Untitled entity',
          descriptor: entity.descriptor ?? '',
          badge: entity.badge ?? '',
          icon: entity.icon ?? 'follow',
          type: entity.type ?? 'entity',
          meta: entity.meta ?? {}
        }
        followedItems = [...previous.followedItems, nextEntity]
        action = { type: 'follow', name: nextEntity.name }
      }
      return {
        ...previous,
        followedItems
      }
    })

    if (action) {
      enqueueAlert({
        tone: action.type === 'follow' ? 'success' : 'info',
        message: action.type === 'follow'
          ? `You're now following ${action.name}.`
          : `Removed ${action.name} from your following list.`
      })
    }
  }, [enqueueAlert])

  const value = useMemo(() => ({
    followedItems: state.followedItems,
    isFollowing,
    toggleFollow,
    alerts,
    dismissAlert,
    enqueueAlert
  }), [alerts, dismissAlert, enqueueAlert, isFollowing, state.followedItems, toggleFollow])

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardData = () => {
  const context = useContext(DashboardDataContext)
  if (!context) {
    throw new Error('useDashboardData must be used within a DashboardDataProvider')
  }
  return context
}
