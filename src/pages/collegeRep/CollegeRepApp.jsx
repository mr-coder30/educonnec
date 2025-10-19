import React, { useCallback, useMemo, useState } from 'react'

const ACCESS_CODE = 'collegerep'
const ACCESS_KEY = 'college_rep_access_granted'

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8 rounded-3xl border border-white/30 bg-white/10 p-10 text-center shadow-2xl shadow-emerald-900/40 backdrop-blur">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
          CR
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">College representative access</p>
          <h1 className="text-3xl font-semibold">Enter the access code</h1>
          <p className="text-sm text-white/80">
            This console is reserved for verified college representatives. Provide the passcode shared with your college admin to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Access code"
            className="w-full rounded-2xl border border-white/40 bg-white/90 px-5 py-3 text-base font-semibold text-slate-900 shadow focus:outline-none focus:ring-4 focus:ring-emerald-300/60"
          />
          {errorMessage && (
            <p className="text-sm font-semibold text-emerald-200">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-white/90 px-5 py-3 text-base font-semibold text-emerald-700 shadow-lg shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:bg-white"
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

const CollegeRepApp = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl border border-white/25 bg-white/10 p-10 text-center shadow-2xl shadow-emerald-900/30 backdrop-blur">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-3xl font-bold">
          CR
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">College representative dashboard</p>
          <h2 className="text-3xl font-semibold">Coming soon</h2>
          <p className="text-sm text-white/80">
            We&apos;re crafting a tailored experience for verified college representatives. Stay tuned for collaboration tools,
            wall management, event insights, and more in an upcoming release.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/85">
            <span className="block text-xs uppercase tracking-[0.3em] text-white/60">Need access?</span>
            <span>Contact your college admin to request early access.</span>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/85">
            <span className="block text-xs uppercase tracking-[0.3em] text-white/60">Questions?</span>
            <span>Email the EduConnect partnerships desk for updates.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeRepApp
