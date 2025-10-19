import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'

const MENU_ITEMS = [
  { name: 'Home', icon: 'home', path: '/dashboard' },
  {
    name: 'Student Collab',
    icon: 'studentCollab',
    submenu: [
      { name: 'Find Collab', path: '/dashboard/student-collab/find' },
      { name: 'Create Collab', path: '/dashboard/student-collab/create' },
      { name: 'My Collab', path: '/dashboard/student-collab/my' },
      { name: 'Collaboration Settings', path: '/dashboard/student-collab/settings' }
    ]
  },
  {
    name: 'Colleges',
    icon: 'colleges',
    submenu: [
      { name: 'All Colleges', path: '/dashboard/colleges' },
      { name: 'Active Now', path: '/dashboard/colleges/active' },
      { name: 'College Wall', path: '/dashboard/colleges/wall' },
      { name: 'Events', path: '/dashboard/colleges/events' },
      { name: 'College Collabs', path: '/dashboard/colleges/collabs' }
    ]
  },
  { name: 'Create Post', icon: 'createPost' },
  { name: 'Saved', icon: 'saved', path: '/dashboard/saved' },
  { name: 'Profile', icon: 'profile', path: '/dashboard/profile' }
]

const Sidebar = ({ onOpenCreatePost }) => {
  const [activeItem, setActiveItem] = useState('Home')
  const [activeSubItem, setActiveSubItem] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const updateActiveState = () => {
      const { pathname } = location
      let matchedMenu = MENU_ITEMS[0]
      let matchedSub = null

      MENU_ITEMS.forEach((item) => {
        if (item.path && pathname === item.path) {
          matchedMenu = item
          matchedSub = null
        }

        if (item.submenu) {
          item.submenu.forEach((sub) => {
            if (pathname === sub.path) {
              matchedMenu = item
              matchedSub = sub
            }
          })
        }
      })

      setActiveItem(matchedMenu.name)
      setActiveSubItem(matchedSub ? matchedSub.name : null)
      setExpandedSection(matchedSub ? matchedMenu.name : matchedMenu.submenu ? matchedMenu.name : null)
    }

    updateActiveState()
  }, [location])

  useEffect(() => {
    const handleSidebarFocus = (event) => {
      const section = event.detail
      const targetItem = MENU_ITEMS.find(item => item.name === section)
      if (!targetItem) return

      if (targetItem.submenu && targetItem.submenu.length > 0) {
        const [firstSub] = targetItem.submenu
        setExpandedSection(targetItem.name)
        setActiveItem(targetItem.name)
        setActiveSubItem(firstSub.name)
        navigate(firstSub.path)
      } else if (targetItem.path) {
        navigate(targetItem.path)
      }
    }

    window.addEventListener('sidebar-focus', handleSidebarFocus)
    return () => {
      window.removeEventListener('sidebar-focus', handleSidebarFocus)
    }
  }, [navigate])

  return (
    <>
      <aside className="hidden lg:block w-72 border-r border-blue-100/60 bg-white/85 dark:border-slate-800 dark:bg-slate-950/85 backdrop-blur sticky top-0 h-screen transition-colors duration-300">
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-blue-50/50 via-white/60 to-purple-50/40 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-slate-900/70" aria-hidden="true"></div>
        <nav className="relative h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <ul className="space-y-3">
              {MENU_ITEMS.map((item) => {
                const isActive = activeItem === item.name
                const isExpanded = expandedSection === item.name

                return (
                  <li key={item.name}>
                    <div
                      className={`group rounded-2xl border transition-all duration-300 ${
                        isExpanded
                          ? 'bg-blue-50 dark:bg-slate-900/80 border-blue-200 dark:border-slate-700 shadow-md'
                          : 'border-transparent dark:border-transparent bg-white/70 dark:bg-slate-900/50 backdrop-blur'
                      }`}
                      onMouseEnter={() => {
                        if (item.submenu) {
                          setExpandedSection(item.name)
                        }
                      }}
                      onMouseLeave={() => {
                        if (item.submenu && activeItem !== item.name) {
                          setExpandedSection(null)
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item.submenu) {
                            setExpandedSection(isExpanded ? null : item.name)
                            setActiveItem(item.name)
                            setActiveSubItem(item.submenu?.[0]?.name)
                            navigate(item.submenu?.[0]?.path)
                          } else if (item.path) {
                            navigate(item.path)
                            setActiveItem(item.name)
                          } else if (item.name === 'Create Post' && onOpenCreatePost) {
                            onOpenCreatePost()
                            setActiveItem(item.name)
                          }
                        }}
                        className={`relative w-full overflow-hidden rounded-3xl border px-4 py-3 text-left transition ${
                          isActive
                            ? 'border-blue-500/70 bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-pink-500/10 text-blue-600 shadow-lg shadow-blue-500/20 dark:border-blue-500/40 dark:text-blue-200'
                            : 'border-transparent bg-white/70 text-gray-600 hover:border-blue-200 hover:bg-blue-50/60 dark:bg-slate-900/70 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        <span className="flex items-center gap-3 text-sm font-semibold">
                          <Icon name={item.icon} className="h-5 w-5" />
                          <span className="flex items-center gap-2">
                            {item.name}
                            {item.submenu && (
                              <span className="text-xs">{isExpanded ? '−' : '+'}</span>
                            )}
                          </span>
                        </span>
                      </button>

                      {item.submenu && isExpanded && (
                        <ul className="mt-2 space-y-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                          {item.submenu.map((subItem) => {
                            const isSubActive = activeSubItem === subItem.name
                            return (
                              <li key={subItem.name}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveItem(item.name)
                                    setActiveSubItem(subItem.name)
                                    navigate(subItem.path)
                                  }}
                                  className={`w-full text-left rounded-xl px-3 py-2 text-xs font-semibold tracking-wide transition ${
                                    isSubActive
                                      ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900/80 dark:text-blue-200'
                                      : 'text-blue-600 hover:bg-white/80 dark:text-blue-200 dark:hover:bg-blue-900/30'
                                  }`}
                                >
                                  {subItem.name}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>

    </>
  )
}

export default Sidebar