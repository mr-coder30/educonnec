import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useDashboardData } from './DashboardDataContext'

const storageKey = 'collabhub_admin_state'

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`

const defaultState = {
  profile: {
    collegeName: 'Aurora Institute of Technology',
    motto: 'Collaborate. Innovate. Lead.',
    location: 'Pune, India',
    logo: '/logos/aurora-tech.png',
    adminName: 'Riya Kapoor',
    description:
      'Leading multi-campus initiatives that unite innovators, engineers, and creators to build meaningful collaborations across India.'
  },
  representatives: [
    {
      id: 'rep-1',
      name: 'Ishaan Mehta',
      email: 'ishaan.mehta@auroratech.edu',
      role: 'Community Lead',
      status: 'active',
      assignedRights: {
        events: true,
        wall: true,
        collaborations: false
      },
      avatar: '/avatars/ishaan.png',
      since: 'Jan 2024'
    },
    {
      id: 'rep-2',
      name: 'Meera Dsouza',
      email: 'meera.dsouza@auroratech.edu',
      role: 'Design Mentor',
      status: 'pending',
      assignedRights: {
        events: false,
        wall: true,
        collaborations: false
      },
      avatar: '/avatars/meera.png',
      since: '—'
    },
    {
      id: 'rep-3',
      name: 'Anik Bose',
      email: 'anik.bose@auroratech.edu',
      role: 'Tech Evangelist',
      status: 'active',
      assignedRights: {
        events: true,
        wall: false,
        collaborations: true
      },
      avatar: '/avatars/anik.png',
      since: 'May 2023'
    },
    {
      id: 'rep-4',
      name: 'Harini Rao',
      email: 'harini.rao@auroratech.edu',
      role: 'Community Strategist',
      status: 'removed',
      assignedRights: {
        events: false,
        wall: false,
        collaborations: false
      },
      avatar: '/avatars/harini.png',
      since: '—'
    }
  ],
  wallPosts: [
    {
      id: 'wall-1',
      title: 'Innovation Week Kick-off!',
      description:
        'We are launching a 7-day sprint featuring product design jams, AI labs, and pitch rounds. Register in teams of 4.',
      image: '/banners/innovation-week.jpg',
      createdAt: '2025-10-12T09:00:00.000Z',
      createdBy: 'Admin',
      reactions: {
        likes: 187,
        celebrates: 42,
        curious: 23
      },
      analytics: {
        views: 1240,
        saves: 98,
        shares: 54
      },
      comments: [
        {
          id: 'comment-1',
          author: 'Priya Sharma',
          role: 'Student',
          postedAt: '2025-10-12T12:15:00.000Z',
          message: 'Will there be mentorship slots for prototype reviews?'
        },
        {
          id: 'comment-2',
          author: 'Campus AI Lab',
          role: 'Club',
          postedAt: '2025-10-12T14:28:00.000Z',
          message: 'Happy to provide compute credits for AI teams. Count us in!'
        }
      ]
    },
    {
      id: 'wall-2',
      title: 'Design Hour with alumni mentors',
      description:
        'Friday 5 PM • Meet alumni interaction designers from Bangalore & Singapore. Submit your folio link before Thursday.',
      image: '/banners/design-hour.jpg',
      createdAt: '2025-10-10T10:30:00.000Z',
      createdBy: 'Ishaan Mehta',
      reactions: {
        likes: 92,
        celebrates: 18,
        curious: 47
      },
      analytics: {
        views: 740,
        saves: 63,
        shares: 21
      },
      comments: [
        {
          id: 'comment-3',
          author: 'Ananya Verma',
          role: 'Student',
          postedAt: '2025-10-10T12:45:00.000Z',
          message: 'Will we get feedback templates before the session?'
        }
      ]
    }
  ],
  events: [
    {
      id: 'event-1',
      title: 'Aurora Tech Summit 2025',
      type: 'Conference',
      date: '2025-11-04',
      timeframe: 'Nov 4 • Auditorium A',
      participants: 420,
      status: 'upcoming',
      poster: '/events/aurora-summit.jpg'
    },
    {
      id: 'event-2',
      title: 'Campus AI Hack Sprint',
      type: 'Hackathon',
      date: '2025-10-18',
      timeframe: 'Oct 18-20 • Innovation Lab',
      participants: 260,
      status: 'ongoing',
      poster: '/events/ai-hack.jpg'
    },
    {
      id: 'event-3',
      title: 'Sustainable Futures Workshop',
      type: 'Workshop',
      date: '2025-09-20',
      timeframe: 'Sep 20 • Studio 3',
      participants: 96,
      status: 'past',
      poster: '/events/sustainability.jpg'
    }
  ],
  collaborations: [
    {
      id: 'collab-1',
      partnerCollege: 'Nimbus School of Innovation',
      event: 'Climate Action Makeathon',
      status: 'Active',
      duration: 'Oct 2025 - Dec 2025',
      contact: 'nimbus-collabs@edu.org'
    },
    {
      id: 'collab-2',
      partnerCollege: 'Zenith Institute of Design',
      event: 'Joint Design Residency',
      status: 'Proposed',
      duration: 'Jan 2026 - Mar 2026',
      contact: 'zenith.design@edu.org'
    },
    {
      id: 'collab-3',
      partnerCollege: 'Orbit College of Media',
      event: 'Campus Creator Exchange',
      status: 'Completed',
      duration: 'May 2025 - Aug 2025',
      contact: 'orbit.media@edu.org'
    }
  ],
  engagement: {
    trends: {
      reactions: { value: 1240, change: 12 },
      comments: { value: 386, change: 9 },
      follows: { value: 217, change: 5 }
    },
    activeStudents: [
      { id: 'student-1', name: 'Priya Sharma', interactions: 38, track: 'Design' },
      { id: 'student-2', name: 'Rahul Iyer', interactions: 31, track: 'AI & ML' },
      { id: 'student-3', name: 'Zara Khan', interactions: 26, track: 'Entrepreneurship' }
    ],
    topPosts: [
      { id: 'wall-1', title: 'Innovation Week Kick-off!', score: 94 },
      { id: 'wall-2', title: 'Design Hour with alumni mentors', score: 81 }
    ]
  },
  settings: {
    general: {
      collegeName: 'Aurora Institute of Technology',
      tagline: 'Where campus collaborations thrive',
      website: 'https://auroratech.edu',
      supportEmail: 'support@auroratech.edu'
    },
    permissions: {
      allowEventCreation: true,
      allowWallPosting: true,
      allowCollabRequests: false
    },
    wallPrivacy: 'public',
    notifications: {
      email: true,
      sms: false,
      push: true,
      weeklyDigest: true
    },
    account: {
      contactEmail: 'admin@auroratech.edu',
      contactPhone: '+91 98765 43210',
      timezone: 'Asia/Kolkata'
    }
  }
}

const CollegeAdminDataContext = createContext(null)

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const CollegeAdminDataProvider = ({ children }) => {
  const { enqueueAlert } = useDashboardData()
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultState
    const stored = window.localStorage.getItem(storageKey)
    const parsed = stored ? safeParse(stored) : null
    return parsed ?? defaultState
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  const updateRepresentatives = useCallback((updater) => {
    setState((previous) => ({
      ...previous,
      representatives: updater(previous.representatives)
    }))
  }, [])

  const addRepresentative = useCallback((payload) => {
    const newRep = {
      id: generateId('rep'),
      name: payload.name,
      email: payload.email,
      role: payload.role ?? 'Representative',
      department: payload.department ?? 'General',
      status: payload.status ?? 'pending',
      assignedRights: {
        events: !!payload.assignedRights?.events,
        wall: !!payload.assignedRights?.wall,
        collaborations: !!payload.assignedRights?.collaborations
      },
      avatar: payload.avatar ?? '/default-avatar.png',
      since: payload.status === 'active'
        ? new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        : '—'
    }
    updateRepresentatives((list) => [newRep, ...list])
    enqueueAlert({ tone: 'success', message: 'Representative invitation sent.' })
  }, [enqueueAlert, updateRepresentatives])

  const updateWallPosts = useCallback((updater) => {
    setState((previous) => ({
      ...previous,
      wallPosts: updater(previous.wallPosts)
    }))
  }, [])

  const updateEvents = useCallback((updater) => {
    setState((previous) => ({
      ...previous,
      events: updater(previous.events)
    }))
  }, [])

  const updateCollaborations = useCallback((updater) => {
    setState((previous) => ({
      ...previous,
      collaborations: updater(previous.collaborations)
    }))
  }, [])

  const updateEngagement = useCallback((updater) => {
    setState((previous) => ({
      ...previous,
      engagement: updater(previous.engagement)
    }))
  }, [])

  const approveRepresentative = useCallback((repId) => {
    updateRepresentatives((list) =>
      list.map((rep) =>
        rep.id === repId
          ? { ...rep, status: 'active', since: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) }
          : rep
      )
    )
    enqueueAlert({ tone: 'success', message: 'Representative approved successfully.' })
  }, [enqueueAlert, updateRepresentatives])

  const removeRepresentative = useCallback((repId) => {
    updateRepresentatives((list) =>
      list.map((rep) => (rep.id === repId ? { ...rep, status: 'removed' } : rep))
    )
    enqueueAlert({ tone: 'info', message: 'Representative moved to removed list.' })
  }, [enqueueAlert, updateRepresentatives])

  const promoteRepresentative = useCallback((repId, newRole) => {
    updateRepresentatives((list) =>
      list.map((rep) => (rep.id === repId ? { ...rep, role: newRole ?? 'Senior Representative' } : rep))
    )
    enqueueAlert({ tone: 'success', message: 'Representative promoted.' })
  }, [enqueueAlert, updateRepresentatives])

  const updateRepresentativePermissions = useCallback((repId, permissions) => {
    updateRepresentatives((list) =>
      list.map((rep) =>
        rep.id === repId
          ? {
              ...rep,
              assignedRights: {
                ...rep.assignedRights,
                ...permissions
              }
            }
          : rep
      )
    )
    enqueueAlert({ tone: 'success', message: 'Representative permissions updated.' })
  }, [enqueueAlert, updateRepresentatives])

  const createWallPost = useCallback((payload) => {
    const newPost = {
      id: generateId('wall'),
      title: payload.title,
      description: payload.description,
      image: payload.image || null,
      createdAt: new Date().toISOString(),
      createdBy: payload.createdBy ?? state.profile.adminName,
      reactions: {
        likes: 0,
        celebrates: 0,
        curious: 0
      },
      analytics: {
        views: 0,
        saves: 0,
        shares: 0
      },
      comments: []
    }
    updateWallPosts((posts) => [newPost, ...posts])
    enqueueAlert({ tone: 'success', message: 'Notice posted to college wall.' })
    updateEngagement((engagement) => ({
      ...engagement,
      topPosts: [{ id: newPost.id, title: newPost.title, score: 0 }, ...engagement.topPosts.slice(0, 4)]
    }))
  }, [enqueueAlert, state.profile.adminName, updateEngagement, updateWallPosts])

  const editWallPost = useCallback((postId, updates) => {
    updateWallPosts((posts) =>
      posts.map((post) => (post.id === postId ? { ...post, ...updates } : post))
    )
    enqueueAlert({ tone: 'success', message: 'Notice updated.' })
  }, [enqueueAlert, updateWallPosts])

  const addWallComment = useCallback((postId, message) => {
    updateWallPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: generateId('comment'),
                  author: state.profile.adminName,
                  role: 'Admin',
                  postedAt: new Date().toISOString(),
                  message
                }
              ]
            }
          : post
      )
    )
  }, [state.profile.adminName, updateWallPosts])

  const toggleWallReaction = useCallback((postId, reactionKey = 'likes') => {
    updateWallPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reactionKey]: post.reactions[reactionKey] + 1
              }
            }
          : post
      )
    )
  }, [updateWallPosts])

  const deleteWallPost = useCallback((postId) => {
    updateWallPosts((posts) => posts.filter((post) => post.id !== postId))
    enqueueAlert({ tone: 'info', message: 'Notice removed from wall.' })
  }, [enqueueAlert, updateWallPosts])

  const toggleWallPin = useCallback((postId) => {
    updateWallPosts((posts) => {
      const current = posts.find((post) => post.id === postId)
      if (!current) return posts
      const updated = posts.map((post) =>
        post.id === postId ? { ...post, pinned: !post.pinned } : post
      )
      return updated.sort((a, b) => (b.pinned === true) - (a.pinned === true))
    })
    enqueueAlert({ tone: 'info', message: 'Wall pin status updated.' })
  }, [enqueueAlert, updateWallPosts])

  const createEvent = useCallback((payload) => {
    const newEvent = {
      id: generateId('event'),
      title: payload.title,
      type: payload.type,
      date: payload.date,
      timeframe: payload.timeframe,
      participants: Number(payload.participants) || 0,
      status: payload.status,
      poster: payload.poster || '/events/default-event.jpg'
    }
    updateEvents((events) => [newEvent, ...events])
    enqueueAlert({ tone: 'success', message: 'Event created successfully.' })
  }, [enqueueAlert, updateEvents])

  const editEvent = useCallback((eventId, updates) => {
    updateEvents((events) =>
      events.map((event) => (event.id === eventId ? { ...event, ...updates } : event))
    )
    enqueueAlert({ tone: 'success', message: 'Event details updated.' })
  }, [enqueueAlert, updateEvents])

  const updateEventStatus = useCallback((eventId, status) => {
    updateEvents((events) =>
      events.map((event) => (event.id === eventId ? { ...event, status } : event))
    )
    enqueueAlert({ tone: 'info', message: 'Event status updated.' })
  }, [enqueueAlert, updateEvents])

  const deleteEvent = useCallback((eventId) => {
    updateEvents((events) => events.filter((event) => event.id !== eventId))
    enqueueAlert({ tone: 'info', message: 'Event removed from schedule.' })
  }, [enqueueAlert, updateEvents])

  const requestCollaboration = useCallback((payload) => {
    const newCollab = {
      id: generateId('collab'),
      partnerCollege: payload.partnerCollege,
      event: payload.event,
      status: 'Proposed',
      duration: payload.duration ?? 'TBD',
      contact: payload.contact ?? 'info@college.edu'
    }
    updateCollaborations((collabs) => [newCollab, ...collabs])
    enqueueAlert({ tone: 'success', message: 'Collaboration request drafted.' })
  }, [enqueueAlert, updateCollaborations])

  const updateCollaborationStatus = useCallback((collabId, status) => {
    updateCollaborations((collabs) =>
      collabs.map((collab) => (collab.id === collabId ? { ...collab, status } : collab))
    )
    enqueueAlert({ tone: 'info', message: 'Collaboration status updated.' })
  }, [enqueueAlert, updateCollaborations])

  const deleteCollaboration = useCallback((collabId) => {
    updateCollaborations((collabs) => collabs.filter((collab) => collab.id !== collabId))
    enqueueAlert({ tone: 'info', message: 'Collaboration removed.' })
  }, [enqueueAlert, updateCollaborations])

  const updateSettings = useCallback((section, payload) => {
    setState((previous) => ({
      ...previous,
      settings: {
        ...previous.settings,
        [section]: {
          ...previous.settings[section],
          ...payload
        }
      }
    }))
    enqueueAlert({ tone: 'success', message: 'Settings saved successfully.' })
  }, [enqueueAlert])

  const updateWallPrivacy = useCallback((privacy) => {
    setState((previous) => ({
      ...previous,
      settings: {
        ...previous.settings,
        wallPrivacy: privacy
      }
    }))
    enqueueAlert({ tone: 'info', message: `Wall visibility updated to ${privacy}.` })
  }, [enqueueAlert])

  const updateProfile = useCallback((payload) => {
    setState((previous) => ({
      ...previous,
      profile: {
        ...previous.profile,
        ...payload
      }
    }))
    enqueueAlert({ tone: 'success', message: 'College profile updated.' })
  }, [enqueueAlert])

  const stats = useMemo(() => {
    const activeReps = state.representatives.filter((rep) => rep.status === 'active').length
    const pendingReps = state.representatives.filter((rep) => rep.status === 'pending').length
    return {
      representatives: activeReps,
      pendingRepresentatives: pendingReps,
      posts: state.wallPosts.length,
      events: state.events.length,
      collaborations: state.collaborations.length
    }
  }, [state.collaborations.length, state.events.length, state.representatives, state.wallPosts.length])

  const upcomingEvents = useMemo(() =>
    state.events
      .filter((event) => event.status === 'upcoming')
      .sort((a, b) => new Date(a.date) - new Date(b.date)),
  [state.events])

  const activeInteractionsSummary = useMemo(() => {
    const totalComments = state.wallPosts.reduce((sum, post) => sum + post.comments.length, 0)
    const totalReactions = state.wallPosts.reduce((sum, post) =>
      sum + Object.values(post.reactions).reduce((acc, value) => acc + value, 0), 0)
    return {
      comments: totalComments,
      reactions: totalReactions,
      trendingPost: state.wallPosts[0]?.title ?? '—'
    }
  }, [state.wallPosts])

  const value = useMemo(() => ({
    profile: state.profile,
    stats,
    representatives: state.representatives,
    wallPosts: state.wallPosts,
    events: state.events,
    collaborations: state.collaborations,
    engagement: state.engagement,
    settings: state.settings,
    upcomingEvents,
    activeInteractionsSummary,
    approveRepresentative,
    removeRepresentative,
    promoteRepresentative,
    updateRepresentativePermissions,
    addRepresentative,
    createWallPost,
    editWallPost,
    addWallComment,
    toggleWallReaction,
    deleteWallPost,
    toggleWallPin,
    createEvent,
    updateEventStatus,
    deleteEvent,
    editEvent,
    requestCollaboration,
    updateCollaborationStatus,
    deleteCollaboration,
    updateSettings,
    updateWallPrivacy,
    updateProfile
  }), [
    activeInteractionsSummary,
    addWallComment,
    addRepresentative,
    approveRepresentative,
    createEvent,
    createWallPost,
    deleteEvent,
    deleteCollaboration,
    deleteWallPost,
    editEvent,
    editWallPost,
    upcomingEvents,
    promoteRepresentative,
    removeRepresentative,
    requestCollaboration,
    stats,
    state.collaborations,
    state.engagement,
    state.events,
    state.profile,
    state.representatives,
    state.settings,
    state.wallPosts,
    toggleWallReaction,
    updateCollaborationStatus,
    updateEventStatus,
    updateProfile,
    updateRepresentativePermissions,
    updateSettings,
    updateWallPrivacy,
    toggleWallPin
  ])

  return <CollegeAdminDataContext.Provider value={value}>{children}</CollegeAdminDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCollegeAdminData = () => {
  const context = useContext(CollegeAdminDataContext)
  if (!context) {
    throw new Error('useCollegeAdminData must be used within a CollegeAdminDataProvider')
  }
  return context
}
