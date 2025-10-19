import React, { useCallback, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { CollegeAdminDataProvider } from '../../context/AdminDataContext'
import DashboardNotificationCenter from '../../context/DashboardNotificationCenter'
import CollegeAdminLayout from './CollegeAdminLayout'
import CollegeAdminOverview from './pages/CollegeAdminOverview'
import CollegeAdminRepresentatives from './pages/CollegeAdminRepresentatives'
import CollegeAdminWall from './pages/CollegeAdminWall'
import CollegeAdminEvents from './pages/CollegeAdminEvents'
import CollegeAdminCollaborations from './pages/CollegeAdminCollaborations'
import CollegeAdminEngagement from './pages/CollegeAdminEngagement'
import CollegeAdminSettings from './pages/CollegeAdminSettings'

const ACCESS_CODE = 'collegeadmin'
const ACCESS_KEY = 'college_admin_access_granted'

const AccessCodeGate = ({ onUnlock }) => {
  const [code, setCode] = useState('')
  const [attempts, setAttempts] = useState(0)

  const errorMessage = useMemo(() => {
    if (!attempts) return ''
    if (code.trim().length === 0) return 'Enter the access code to continue.'
    return 'Incorrect access code. Try again.'
  }, [attempts, code])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    const trimmed = code.trim().toLowerCase()
    if (trimmed === ACCESS_CODE) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(ACCESS_KEY, 'true')
      }
      onUnlock()
      return
    }
    setAttempts((prev) => prev + 1)
  }, [code, onUnlock])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8 rounded-3xl border border-white/30 bg-white/10 p-10 text-center shadow-2xl shadow-purple-900/40 backdrop-blur">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
          CA
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">College admin access</p>
          <h1 className="text-3xl font-semibold">Enter the access code</h1>
          <p className="text-sm text-white/80">
            This console is reserved for verified college administrators. Provide the passcode shared with the EduConnect ops team to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Access code"
            className="w-full rounded-2xl border border-white/40 bg-white/90 px-5 py-3 text-base font-semibold text-slate-900 shadow focus:outline-none focus:ring-4 focus:ring-purple-300/60"
          />
          {errorMessage && (
            <p className="text-sm font-semibold text-pink-200">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-white/90 px-5 py-3 text-base font-semibold text-purple-700 shadow-lg shadow-purple-900/30 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Unlock dashboard
          </button>
        </form>
        <p className="text-xs text-white/70">
          Need help? Reach the EduConnect partnerships desk to request a fresh access code.
        </p>
      </div>
    </div>
  )
}

const CollegeAdminApp = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(ACCESS_KEY) === 'true'
  })

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true)
  }, [])

  if (!isUnlocked) {
    return <AccessCodeGate onUnlock={handleUnlock} />
  }

  return (
    <CollegeAdminDataProvider>
      <div className="relative min-h-screen">
        <DashboardNotificationCenter />
        <Routes>
          <Route element={<CollegeAdminLayout />}>
            <Route index element={<CollegeAdminOverview />} />
            <Route path="representatives" element={<CollegeAdminRepresentatives />} />
            <Route path="wall" element={<CollegeAdminWall />} />
            <Route path="events" element={<CollegeAdminEvents />} />
            <Route path="collaborations" element={<CollegeAdminCollaborations />} />
            <Route path="engagement" element={<CollegeAdminEngagement />} />
            <Route path="settings" element={<CollegeAdminSettings />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Route>
        </Routes>
      </div>
    </CollegeAdminDataProvider>
  )
}

export default CollegeAdminApp
