import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`

const defaultState = {
  profile: {
    name: 'Aarya Desai',
    role: 'College Representative',
    department: 'Community Outreach',
    email: 'aarya.desai@auroratech.edu',
    phone: '+91 99876 54321',
    collegeName: 'Aurora Institute of Technology',
    logo: '/logos/aurora-tech.png',
    avatar: '/avatars/aarya.png',
    welcomeMessage: 'Driving campus engagement across events and collaborations this week.'
  },
  posts: [
    {
      id: 'post-1',
      title: 'Hackathon Mentor Signup',
      body: 'Calling alumni mentors for the Aurora AI Hack Sprint happening next weekend. Share your availability to support prototype feedback sessions.',
      tag: 'Announcement',
      visibility: 'Public',
      createdAt: '2025-10-14T09:30:00.000Z',
      reactions: 142,
      comments: 36,
      status: 'Active',
      pinned: true,
      attachments: ['/docs/hack-sprint-brief.pdf']
    },
    {
      id: 'post-2',
      title: 'Design Sprint Volunteers',
      body: 'Seeking volunteers to run usability tests for the incoming design sprint teams. Training session Friday 6 PM at Studio 2.',
      tag: 'Notice',
      visibility: 'College only',
      createdAt: '2025-10-11T14:10:00.000Z',
      reactions: 68,
      comments: 21,
      status: 'Active',
      pinned: false,
      attachments: []
    },
    {
      id: 'post-3',
      title: 'Innovation Week Wrap-up',
      body: 'Highlights from the 7-day innovation marathon with key participation stats, award categories, and next steps for community projects.',
      tag: 'Announcement',
      visibility: 'Public',
      createdAt: '2025-09-28T18:45:00.000Z',
      reactions: 204,
      comments: 52,
      status: 'Archived',
      pinned: false,
      attachments: ['/reports/innovation-week-highlights.pdf']
    }
  ],
  events: [
    {
      id: 'event-1',
      title: 'Aurora Innovation Week',
      type: 'Festival',
      date: '2025-11-02',
      status: 'Upcoming',
      participants: 520,
      location: 'Innovation Hub',
      registrationLink: 'https://aurora.events/innovation-week',
      collaborators: ['Nimbus School of Innovation'],
      description: 'Campus-wide festival featuring product showcases, mentor sessions, and partner showcases.'
    },
    {
      id: 'event-2',
      title: 'AI Hack Sprint',
      type: 'Hackathon',
      date: '2025-10-19',
      status: 'Ongoing',
      participants: 260,
      location: 'Campus AI Lab',
      registrationLink: 'https://aurora.events/ai-sprint',
      collaborators: ['Campus AI Society', 'Orbit College of Media'],
      description: 'Three-day sprint tackling AI for social good challenges with alumni mentors.'
    },
    {
      id: 'event-3',
      title: 'Social Impact Demo Day',
      type: 'Seminar',
      date: '2025-09-08',
      status: 'Completed',
      participants: 190,
      location: 'Auditorium A',
      registrationLink: 'https://aurora.events/demo-day',
      collaborators: ['Zenith Institute of Design'],
      description: 'Showcase of social innovation projects with panel reviews and funding pitches.'
    }
  ],
  collaborations: [
    {
      id: 'collab-1',
      partner: 'Nimbus School of Innovation',
      event: 'Climate Action Makeathon',
      status: 'Active',
      timeline: 'Oct 2025 – Dec 2025',
      notes: 'Weekly syncs on Wednesdays. Joint mentor pool confirmed.'
    },
    {
      id: 'collab-2',
      partner: 'Zenith Institute of Design',
      event: 'Design Residency',
      status: 'Pending',
      timeline: 'Jan 2026 – Mar 2026',
      notes: 'Awaiting confirmation on travel support and workshop formats.'
    },
    {
      id: 'collab-3',
      partner: 'Orbit College of Media',
      event: 'Creator Exchange',
      status: 'Past',
      timeline: 'May 2025 – Aug 2025',
      notes: 'Shared documentation archived with testimonials.'
    }
  ],
  wall: [
    {
      id: 'wall-1',
      author: 'College Admin',
      role: 'Admin',
      title: 'Innovation Week registrations close Friday',
      body: 'Secure your spot for prototype showcases and mentor reviews. Late submissions close by 5 PM Friday.',
      createdAt: '2025-10-15T07:15:00.000Z',
      attachments: ['/banners/innovation-week.jpg'],
      reactions: {
        celebrate: 54,
        curious: 23,
        support: 19
      },
      comments: [
        {
          id: 'comment-1',
          author: 'Rohit Patel',
          message: 'Can student clubs host parallel sessions?',
          createdAt: '2025-10-15T09:00:00.000Z'
        },
        {
          id: 'comment-2',
          author: 'Aarya Desai',
          message: 'Yes, submit your slot requests using the collab form by Thursday.',
          createdAt: '2025-10-15T09:15:00.000Z'
        }
      ]
    },
    {
      id: 'wall-2',
      author: 'Aarya Desai',
      role: 'Representative',
      title: 'Volunteer briefing for hack sprint',
      body: 'Briefing tomorrow at 4 PM in Lab 3. We will cover mentor assignments and desk allocations.',
      createdAt: '2025-10-13T11:50:00.000Z',
      attachments: [],
      reactions: {
        celebrate: 31,
        curious: 17,
        support: 29
      },
      comments: [
        {
          id: 'comment-3',
          author: 'Campus AI Society',
          message: 'Will the session be recorded for remote volunteers?',
          createdAt: '2025-10-13T12:05:00.000Z'
        }
      ]
    }
  ],
  analytics: {
    wallEngagement: {
      views: 3680,
      reactions: 742,
      comments: 148
    },
    eventParticipationTrend: [
      { month: 'Jun', participants: 180 },
      { month: 'Jul', participants: 220 },
      { month: 'Aug', participants: 260 },
      { month: 'Sep', participants: 305 },
      { month: 'Oct', participants: 420 }
    ],
    topPerforming: [
      { id: 'post-1', title: 'Hackathon Mentor Signup', score: 94 },
      { id: 'event-2', title: 'AI Hack Sprint', score: 88 },
      { id: 'wall-1', title: 'Innovation Week registrations close Friday', score: 82 }
    ],
    kpi: [
      { id: 'kpi-1', label: 'Wall reactions', value: 742, change: 12 },
      { id: 'kpi-2', label: 'Comments', value: 148, change: 9 },
      { id: 'kpi-3', label: 'Event registrations', value: 420, change: 15 }
    ]
  },
  requests: [
    {
      id: 'req-1',
      college: 'Nimbus School of Innovation',
      event: 'Climate Action Makeathon',
      message: 'Requesting approval for joint keynote speaker and shared judging panel.',
      date: '2025-10-14',
      status: 'Pending'
    },
    {
      id: 'req-2',
      college: 'Zenith Institute of Design',
      event: 'Design Residency',
      message: 'Sharing draft collaboration charter for your review.',
      date: '2025-10-10',
      status: 'Pending'
    },
    {
      id: 'req-3',
      college: 'Orbit College of Media',
      event: 'Creator Exchange',
      message: 'Thank you for the partnership. Sharing final report for records.',
      date: '2025-09-25',
      status: 'Approved'
    }
  ],
  settings: {
    profile: {
      name: 'Aarya Desai',
      role: 'College Representative',
      department: 'Community Outreach',
      contactEmail: 'aarya.desai@auroratech.edu',
      phone: '+91 99876 54321'
    },
    notifications: {
      wall: true,
      events: true,
      collaborations: true,
      digests: false
    },
    privacy: {
      restrictWallComments: false,
      limitEventVisibility: false,
      allowCollabInvites: true
    },
    account: {
      timezone: 'Asia/Kolkata'
    }
  },
  notifications: [
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
  ]
}

const CollegeRepDataContext = createContext(null)

export const CollegeRepDataProvider = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const createPost = useCallback((payload) => {
    const newPost = {
      id: generateId('post'),
      title: payload.title,
      body: payload.body ?? '',
      tag: payload.tag,
      visibility: payload.visibility,
      createdAt: new Date().toISOString(),
      reactions: 0,
      comments: 0,
      status: 'Active',
      pinned: false,
      attachments: payload.attachments ?? []
    }
    setState((previous) => ({
      ...previous,
      posts: [newPost, ...previous.posts]
    }))
  }, [])

  const updatePost = useCallback((postId, updates) => {
    setState((previous) => ({
      ...previous,
      posts: previous.posts.map((post) => post.id === postId ? { ...post, ...updates } : post)
    }))
  }, [])

  const togglePostPin = useCallback((postId) => {
    setState((previous) => ({
      ...previous,
      posts: previous.posts.map((post) => post.id === postId ? { ...post, pinned: !post.pinned } : post)
    }))
  }, [])

  const deletePost = useCallback((postId) => {
    setState((previous) => ({
      ...previous,
      posts: previous.posts.filter((post) => post.id !== postId)
    }))
  }, [])

  const createEvent = useCallback((payload) => {
    const newEvent = {
      id: generateId('event'),
      title: payload.title,
      type: payload.type,
      date: payload.date,
      status: payload.status,
      participants: Number(payload.participants) || 0,
      location: payload.location,
      registrationLink: payload.registrationLink,
      collaborators: payload.collaborators?.filter(Boolean) ?? [],
      description: payload.description ?? ''
    }
    setState((previous) => ({
      ...previous,
      events: [newEvent, ...previous.events]
    }))
  }, [])

  const updateEvent = useCallback((eventId, updates) => {
    setState((previous) => ({
      ...previous,
      events: previous.events.map((event) => event.id === eventId ? { ...event, ...updates } : event)
    }))
  }, [])

  const updateEventStatus = useCallback((eventId, status) => {
    setState((previous) => ({
      ...previous,
      events: previous.events.map((event) => event.id === eventId ? { ...event, status } : event)
    }))
  }, [])

  const deleteEvent = useCallback((eventId) => {
    setState((previous) => ({
      ...previous,
      events: previous.events.filter((event) => event.id !== eventId)
    }))
  }, [])

  const createCollaboration = useCallback((payload) => {
    const newCollab = {
      id: generateId('collab'),
      partner: payload.partner,
      event: payload.event,
      status: 'Pending',
      timeline: payload.timeline ?? 'TBD',
      notes: payload.notes ?? ''
    }
    setState((previous) => ({
      ...previous,
      collaborations: [newCollab, ...previous.collaborations]
    }))
  }, [])

  const updateCollaborationStatus = useCallback((collabId, status) => {
    setState((previous) => ({
      ...previous,
      collaborations: previous.collaborations.map((collab) => collab.id === collabId ? { ...collab, status } : collab)
    }))
  }, [])

  const addWallComment = useCallback((postId, message) => {
    if (!message) return
    setState((previous) => ({
      ...previous,
      wall: previous.wall.map((post) => post.id === postId ? {
        ...post,
        comments: [
          ...post.comments,
          {
            id: generateId('comment'),
            author: previous.profile.name,
            message,
            createdAt: new Date().toISOString()
          }
        ]
      } : post)
    }))
  }, [])

  const createWallPost = useCallback((payload) => {
    const newPost = {
      id: generateId('wall'),
      author: payload.author ?? state.profile.name,
      role: payload.role ?? 'Representative',
      title: payload.title,
      body: payload.body,
      createdAt: new Date().toISOString(),
      attachments: payload.attachments ?? [],
      reactions: {
        celebrate: 0,
        curious: 0,
        support: 0
      },
      comments: []
    }
    setState((previous) => ({
      ...previous,
      wall: [newPost, ...previous.wall]
    }))
  }, [state.profile.name])

  const reactToWallPost = useCallback((postId, reactionKey) => {
    setState((previous) => ({
      ...previous,
      wall: previous.wall.map((post) => post.id === postId ? {
        ...post,
        reactions: {
          ...post.reactions,
          [reactionKey]: (post.reactions[reactionKey] || 0) + 1
        }
      } : post)
    }))
  }, [])

  const respondToRequest = useCallback((requestId, status) => {
    setState((previous) => ({
      ...previous,
      requests: previous.requests.map((request) => request.id === requestId ? { ...request, status } : request)
    }))
  }, [])

  const markNotificationRead = useCallback((notificationId) => {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.map((notification) => notification.id === notificationId ? { ...notification, read: true } : notification)
    }))
  }, [])

  const markCategoryNotificationsRead = useCallback((category) => {
    setState((previous) => ({
      ...previous,
      notifications: previous.notifications.map((notification) => notification.category === category ? { ...notification, read: true } : notification)
    }))
  }, [])

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
  }, [])

  const updateProfile = useCallback((payload) => {
    setState((previous) => ({
      ...previous,
      profile: {
        ...previous.profile,
        ...payload
      }
    }))
  }, [])

  const derivedStats = useMemo(() => {
    const activePosts = state.posts.filter((post) => post.status === 'Active').length
    const hostedEvents = state.events.filter((event) => event.status !== 'Draft').length
    const pendingCollabs = state.collaborations.filter((collab) => collab.status === 'Pending').length
    const engagementTotals = state.wall.reduce((totals, post) => {
      const reactionSum = Object.values(post.reactions).reduce((acc, value) => acc + value, 0)
      return {
        reactions: totals.reactions + reactionSum,
        comments: totals.comments + post.comments.length
      }
    }, { reactions: 0, comments: 0 })
    return {
      activePosts,
      hostedEvents,
      pendingCollabs,
      engagementReactions: engagementTotals.reactions,
      engagementComments: engagementTotals.comments
    }
  }, [state.collaborations, state.events, state.posts, state.wall])

  const value = useMemo(() => ({
    profile: state.profile,
    posts: state.posts,
    events: state.events,
    collaborations: state.collaborations,
    wall: state.wall,
    analytics: state.analytics,
    requests: state.requests,
    settings: state.settings,
    notifications: state.notifications,
    derivedStats,
    createPost,
    updatePost,
    togglePostPin,
    deletePost,
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent,
    createCollaboration,
    updateCollaborationStatus,
    addWallComment,
    createWallPost,
    reactToWallPost,
    respondToRequest,
    markNotificationRead,
    markCategoryNotificationsRead,
    updateSettings,
    updateProfile
  }), [
    addWallComment,
    createCollaboration,
    createEvent,
    createPost,
    createWallPost,
    deleteEvent,
    deletePost,
    derivedStats,
    markCategoryNotificationsRead,
    markNotificationRead,
    reactToWallPost,
    respondToRequest,
    state.analytics,
    state.collaborations,
    state.events,
    state.notifications,
    state.posts,
    state.profile,
    state.requests,
    state.settings,
    state.wall,
    togglePostPin,
    updateCollaborationStatus,
    updateEvent,
    updateEventStatus,
    updatePost,
    updateProfile,
    updateSettings
  ])

  return (
    <CollegeRepDataContext.Provider value={value}>
      {children}
    </CollegeRepDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCollegeRepData = () => {
  const context = useContext(CollegeRepDataContext)
  if (!context) {
    throw new Error('useCollegeRepData must be used within a CollegeRepDataProvider')
  }
  return context
}
