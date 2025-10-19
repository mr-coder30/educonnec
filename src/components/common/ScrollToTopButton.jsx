import React, { useEffect, useState } from 'react'

import Icon from './Icon'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll back to top"
      className={`fixed bottom-24 right-4 z-40 transform transition-all duration-300 sm:bottom-28 sm:right-6 sm:left-auto sm:translate-x-0 ${
        isVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <span className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/50 backdrop-blur-xl shadow-[0_18px_40px_-20px_rgba(37,99,235,0.6)] dark:border-slate-800/70 dark:bg-slate-900/60 dark:shadow-[0_18px_40px_-20px_rgba(148,163,184,0.45)]">
        <span className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-indigo-500/40 to-purple-500/60 opacity-80 transition group-hover:opacity-100"></span>
        <span className="absolute inset-[1px] rounded-full bg-white/70 backdrop-blur-xl transition group-hover:bg-white/80 dark:bg-slate-950/70 dark:group-hover:bg-slate-950/80"></span>
        <Icon name="scrollTop" className="relative h-5 w-5 text-blue-600 transition-transform group-hover:-translate-y-1 dark:text-blue-200" />
      </span>
    </button>
  )
}

export default ScrollToTopButton
