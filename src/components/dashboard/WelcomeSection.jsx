import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const motivationalQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Believe you can and you're halfway there. - Theodore Roosevelt"
]

const WelcomeSection = () => {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(false), 4000)
    return () => clearTimeout(timeoutId)
  }, [])

  const randomQuote = useMemo(() => (
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  ), [])

  if (!isVisible) return null

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-5 text-gray-900 shadow-xl shadow-blue-500/20 dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white sm:rounded-[32px] sm:p-8">
      <div className="absolute -top-20 -right-14 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl dark:bg-slate-800/40 sm:-top-24 sm:-right-16 sm:h-64 sm:w-64"></div>
      <div className="absolute bottom-[-20px] left-[-20px] h-32 w-32 rounded-full bg-purple-200/40 blur-2xl dark:bg-slate-800/50 sm:bottom-0 sm:left-0 sm:h-40 sm:w-40"></div>

      <div className="relative space-y-3 sm:space-y-4 max-w-2xl">
        <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-xs text-gray-600 sm:text-sm dark:text-white/85">
          {randomQuote}
        </p>
      </div>
    </section>
  )
}

export default WelcomeSection