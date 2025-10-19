import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Icon from '../components/common/Icon'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isAdmin = formData.email.trim().toLowerCase() === 'admin@college.edu' && formData.password === 'Admin@123'
    const userData = isAdmin
      ? {
          id: 'admin-1',
          name: 'Aurora Admin',
          email: formData.email.trim(),
          profilePicture: '/default-avatar.png',
          role: 'admin'
        }
      : {
          id: 1,
          name: 'John Doe',
          email: formData.email.trim(),
          profilePicture: '/default-avatar.png',
          role: 'student'
        }
    login(userData)
    navigate(isAdmin ? '/admin' : '/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="relative max-w-6xl xl:max-w-7xl w-full">
        <div className="hidden sm:block absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur opacity-60" aria-hidden="true"></div>
        <div className="relative rounded-3xl bg-white/95 dark:bg-gray-900/90 backdrop-blur border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
          <div className="grid xl:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col gap-8 p-6 sm:p-12 xl:p-14">
              <div className="sm:hidden">
                <div className="flex items-center justify-between text-blue-700">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-blue-500">CollabHub</p>
                    <p className="text-base font-semibold">Sign in</p>
                  </div>
                  <button type="button" className="text-xs font-semibold text-blue-500">Need help?</button>
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-flex w-full sm:w-auto justify-center sm:justify-start items-center px-4 py-1 rounded-full bg-white/80 text-blue-700 sm:bg-blue-100 sm:text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 text-xs font-semibold uppercase tracking-wide">
                  Welcome back to CollabHub
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                  Access your collaboration hub
                </h1>
                <p className="text-base text-gray-700 sm:text-gray-600 dark:text-gray-300 max-w-xl mx-auto sm:mx-0">
                  Sign in to continue discovering opportunities, reconnect with your teams, and keep building your campus journey.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/80 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Account access
                    </h3>
                    <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-300">
                      Forgot password?
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        College email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="name@yourcollege.edu"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <label className="flex items-center justify-between gap-3 rounded-2xl bg-blue-50/40 dark:bg-blue-900/20 px-4 py-3 text-xs font-medium text-blue-600 dark:text-blue-200">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-blue-200 text-blue-600 focus:ring-blue-500 dark:bg-gray-900/70"
                        />
                        Keep me signed in
                      </span>
                      <span className="hidden sm:inline-flex text-[11px] uppercase tracking-wide text-blue-400">Secure</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-transform hover:-translate-y-0.5"
                  >
                    Sign in
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <p className="text-center sm:text-left">
                      New to CollabHub?
                    </p>
                    <Link to="/signup" className="inline-flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 px-4 py-2 font-semibold hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200">
                      Create an account
                    </Link>
                  </div>
                </div>
              </form>

              <div className="sm:hidden pt-2">
                <div className="mx-auto h-1.5 w-16 rounded-full bg-blue-200"></div>
                <p className="mt-4 text-center text-[11px] text-gray-500">Swipe up for updates after signing in.</p>
              </div>
            </div>

            <div className="relative hidden xl:flex flex-col justify-between bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-12">
              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm font-medium">
                    Why return?
                  </span>
                  <h2 className="mt-4 text-3xl font-bold leading-tight">
                    Pick up right where your teams left off
                  </h2>
                </div>

                <ul className="space-y-6 text-sm text-blue-100">
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="idea" className="h-5 w-5" /></span>
                    <p>Access AI insights tailored to your ongoing collaborations.</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="mail" className="h-5 w-5" /></span>
                    <p>Stay on top of invites, announcements, and fast-moving opportunities.</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-1 text-lg"><Icon name="globe" className="h-5 w-5" /></span>
                    <p>Grow your network with mentors, peers, and campus communities worldwide.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold mb-2">"Every login sparks new collaborations. Our team found two internships through CollabHub updates!"</h3>
                  <p className="text-sm text-blue-100">— Ravi Kumar, NIT Trichy</p>
                </div>
                <div className="text-xs text-blue-200/80">
                  Thousands of returning members explore fresh matches every day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login