import React, { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContextInstance'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const stored = localStorage.getItem('theme')
  if (stored) {
    return stored === 'dark'
  }

  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return false
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const [userHasPreference, setUserHasPreference] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return localStorage.getItem('theme') !== null
  })

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.dataset.theme = isDark ? 'dark' : 'light'
    root.style.colorScheme = isDark ? 'dark' : 'light'
    document.body.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event) => {
      if (!userHasPreference) {
        setIsDark(event.matches)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }

    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [userHasPreference])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      }
      return next
    })
    setUserHasPreference(true)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}