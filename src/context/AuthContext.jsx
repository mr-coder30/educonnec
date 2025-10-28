import React, { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './AuthContextInstance'

const USER_STORAGE_KEY = 'mock_auth_users'
const SESSION_STORAGE_KEY = 'mock_auth_session'

const roleRedirects = {
  student: '/dashboard',
  college_admin: '/collegeadmin',
  college_rep: '/collegerep'
}

const DEFAULT_USERS = [
  {
    id: 'student-1',
    email: 'student@test.com',
    password: 'Student@123',
    role: 'student',
    name: 'Sasha Student',
    profilePicture: '/default-avatar.png',
    profile: {
      full_name: 'Sasha Student',
      username: 'sasha-student',
      studying: 'B.Tech',
      college: 'MIT',
      bio: 'Demo student profile for dashboard access.'
    }
  },
  {
    id: 'college-admin-1',
    email: 'college@test.com',
    password: 'College@123',
    role: 'college_admin',
    name: 'Aurora College Admin',
    profilePicture: '/default-avatar.png',
    profile: {
      institution_name: 'Aurora Institute of Technology',
      contact_email: 'college@test.com',
      location: 'Pune, India',
      description: 'Demo institution data for admin dashboard.'
    }
  },
  {
    id: 'college-rep-1',
    email: 'representative@test.com',
    password: 'Rep@123',
    role: 'college_rep',
    name: 'Ishaan Representative',
    profilePicture: '/default-avatar.png',
    profile: {
      full_name: 'Ishaan Representative',
      designation: 'Community Lead',
      college: 'Aurora Institute of Technology',
      phone: '+91-90000-00000'
    }
  }
]

const isBrowser = typeof window !== 'undefined'

const normalizeEmail = (email) => (typeof email === 'string' ? email.trim().toLowerCase() : '')

const readStoredJson = (key, fallback = null) => {
  if (!isBrowser) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (error) {
    console.warn(`Failed to parse localStorage item ${key}`, error)
    return fallback
  }
}

const writeStoredJson = (key, value) => {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Failed to persist localStorage item ${key}`, error)
  }
}

const removeStoredItem = (key) => {
  if (!isBrowser) return
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Failed to remove localStorage item ${key}`, error)
  }
}

const ensureDefaultUsers = (storedUsers = []) => {
  const map = new Map()
  DEFAULT_USERS.forEach((user) => {
    map.set(normalizeEmail(user.email), { ...user })
  })

  storedUsers.forEach((user) => {
    if (!user?.email) return
    map.set(normalizeEmail(user.email), { ...user })
  })

  return Array.from(map.values())
}

const matchUser = (users, email) => {
  if (!email) return null
  return users.find((user) => normalizeEmail(user.email) === normalizeEmail(email)) || null
}

const buildUserObject = (userRecord) => {
  if (!userRecord) return null

  const baseName = userRecord.name ?? userRecord.profile?.full_name ?? userRecord.email?.split('@')[0] ?? 'User'

  return {
    id: userRecord.id,
    email: userRecord.email,
    role: userRecord.role,
    name: baseName,
    profilePicture: userRecord.profilePicture ?? '/default-avatar.png',
    profile: userRecord.profile ?? {},
    metadata: userRecord.metadata ?? {},
    roleDetails: userRecord.roleDetails ?? userRecord.profile ?? {},
    homePath: roleRedirects[userRecord.role] ?? '/dashboard'
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => ensureDefaultUsers(readStoredJson(USER_STORAGE_KEY, [])))
  const [user, setUser] = useState(() => {
    const storedSession = readStoredJson(SESSION_STORAGE_KEY, null)
    if (!storedSession) return null
    const userRecord = matchUser(ensureDefaultUsers(readStoredJson(USER_STORAGE_KEY, [])), storedSession.email) ?? storedSession
    return buildUserObject(userRecord)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const persistUsers = useCallback((nextUsers) => {
    setUsers(nextUsers)
    writeStoredJson(USER_STORAGE_KEY, nextUsers)
  }, [])

  const persistSession = useCallback((sessionUser) => {
    if (sessionUser) {
      writeStoredJson(SESSION_STORAGE_KEY, sessionUser)
    } else {
      removeStoredItem(SESSION_STORAGE_KEY)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const storedSession = readStoredJson(SESSION_STORAGE_KEY, null)
      if (!storedSession) {
        setUser(null)
        setLoading(false)
        return null
      }

      const currentUsers = ensureDefaultUsers(readStoredJson(USER_STORAGE_KEY, users))
      persistUsers(currentUsers)

      const matched = matchUser(currentUsers, storedSession.email)
      const nextUser = buildUserObject(matched ?? storedSession)
      setUser(nextUser)
      persistSession(nextUser)
      setLoading(false)
      return nextUser
    } catch (err) {
      console.error('Failed to refresh mock session', err)
      setError(err)
      setUser(null)
      persistSession(null)
      setLoading(false)
      return null
    }
  }, [persistSession, persistUsers, users])

  const signIn = useCallback(async ({ email, password }) => {
    const currentUsers = ensureDefaultUsers(readStoredJson(USER_STORAGE_KEY, users))

    const matched = matchUser(currentUsers, email)
    if (!matched || matched.password !== password) {
      throw new Error('Invalid email or password')
    }

    const sessionUser = buildUserObject(matched)
    setUser(sessionUser)
    persistSession(sessionUser)
    persistUsers(currentUsers)

    return { user: sessionUser }
  }, [persistSession, persistUsers, users])

  const signOut = useCallback(async () => {
    setUser(null)
    persistSession(null)
    return { success: true }
  }, [persistSession])

  const signUp = useCallback(async ({ email, password, role, profileData = {}, metadata = {} }) => {
    if (!email || !password || !role) {
      throw new Error('Email, password, and role are required')
    }

    const normalizedEmail = normalizeEmail(email)
    const currentUsers = ensureDefaultUsers(readStoredJson(USER_STORAGE_KEY, users))

    if (matchUser(currentUsers, normalizedEmail)) {
      throw new Error('An account with this email already exists')
    }

    const id = `user-${Date.now()}`
    const displayName = profileData.full_name
      ?? profileData.institution_name
      ?? metadata.full_name
      ?? metadata.name
      ?? normalizedEmail.split('@')[0]

    const newUser = {
      id,
      email: normalizedEmail,
      password,
      role,
      name: displayName,
      profilePicture: profileData.avatar_url ?? '/default-avatar.png',
      profile: profileData,
      metadata,
      roleDetails: profileData
    }

    const nextUsers = [...currentUsers, newUser]
    persistUsers(nextUsers)

    const sessionUser = buildUserObject(newUser)
    setUser(sessionUser)
    persistSession(sessionUser)

    return { user: sessionUser }
  }, [persistSession, persistUsers, users])

  const value = useMemo(() => ({
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp,
    refreshUser,
    login: signIn,
    logout: signOut
  }), [user, loading, error, signIn, signOut, signUp, refreshUser])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}