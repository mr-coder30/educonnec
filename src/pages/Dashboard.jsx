import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import CreatePostModal from '../components/common/CreatePostModal'
import WelcomeSection from '../components/dashboard/WelcomeSection'
import FiltersSection from '../components/dashboard/FilterSection'
import FeedSection from '../components/dashboard/FeedSection'
import PagePlaceholder from '../components/common/PagePlaceholder'
import Icon from '../components/common/Icon'
import StudentCollabFind from './dashboard/StudentCollabFind'
import StudentCollabCreate from './dashboard/StudentCollabCreate'
import StudentCollabMy from './dashboard/StudentCollabMy'
import StudentCollabSettings from './dashboard/StudentCollabSettings'
import DashboardSettings from './dashboard/DashboardSettings'
import CollegesDirectory from './dashboard/CollegesDirectory'
import CollegesActive from './dashboard/CollegesActive'
import CollegesWall from './dashboard/CollegesWall'
import CollegesEvents from './dashboard/CollegesEvents'
import CollegesCollabs from './dashboard/CollegesCollabs'
import Notifications from './dashboard/Notifications'
import SavedItems from './dashboard/SavedItems'
import ProfileOverview from './dashboard/ProfileOverview'
import AIChatButton from '../components/common/AIChatButton'
import FullPageLoader from '../components/common/FullPageLoader'
import ScrollToTopButton from '../components/common/ScrollToTopButton'

const DashboardHome = ({ filters, setFilters }) => (
  <div className="relative px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" aria-hidden="true"></div>
    <div className="relative max-w-5xl mx-auto space-y-8">
      <WelcomeSection />
      <FiltersSection onFiltersChange={setFilters} />
      <section className="rounded-[32px] border border-blue-100 bg-white/90 p-8 shadow-xl shadow-blue-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <FeedSection filters={filters} />
      </section>
    </div>
  </div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const [filters, setFilters] = useState({
    postedBy: 'all',
    category: 'all'
  })
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)

  if (!user) {
    return <FullPageLoader message="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-[72px] sm:pb-0">
      <Header />

      <div className="flex">
        <Sidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <Routes>
            <Route index element={<DashboardHome filters={filters} setFilters={setFilters} />} />
            <Route path="student-collab/find" element={<StudentCollabFind />} />
            <Route path="student-collab/create" element={<StudentCollabCreate />} />
            <Route path="student-collab/my" element={<StudentCollabMy />} />
            <Route path="student-collab/settings" element={<StudentCollabSettings />} />
            <Route path="colleges" element={<CollegesDirectory />} />
            <Route path="colleges/active" element={<CollegesActive />} />
            <Route path="colleges/wall" element={<CollegesWall />} />
            <Route path="colleges/events" element={<CollegesEvents />} />
            <Route path="colleges/collabs" element={<CollegesCollabs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="saved" element={<SavedItems />} />
            <Route path="profile" element={<ProfileOverview />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>
      </div>

      <AIChatButton
        isOpen={isAIChatOpen}
        onOpen={() => setIsAIChatOpen(true)}
        onClose={() => setIsAIChatOpen(false)}
      />
      <ScrollToTopButton />
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_24px_-18px_rgba(15,23,42,0.45)] sm:hidden">
        <div className="mx-auto max-w-lg grid grid-cols-5 h-[70px] text-[11px] font-semibold tracking-wide">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('sidebar-focus', { detail: 'Home' }))}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-300"
          >
            <Icon name="home" className="h-6 w-6" />
            Home
          </button>
          <button
            type="button"
            onClick={() => setIsAIChatOpen(true)}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-300"
          >
            <Icon name="aiAssistant" className="h-6 w-6" />
            AI Chat
          </button>
          <button
            type="button"
            onClick={() => setIsCreatePostOpen(true)}
            className="flex items-center justify-center"
          >
            <span className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg -translate-y-4">
              <Icon name="plus" className="h-6 w-6" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('sidebar-focus', { detail: 'Saved' }))}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-300"
          >
            <Icon name="saved" className="h-6 w-6" />
            Saved
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('sidebar-focus', { detail: 'Profile' }))}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-300"
          >
            <Icon name="profile" className="h-6 w-6" />
            Profile
          </button>
        </div>
      </nav>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  )
}

export default Dashboard