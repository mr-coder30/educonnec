import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardDataProvider } from './context/DashboardDataContext'
import { useAuth } from './hooks/useAuth'
import FullPageLoader from './components/common/FullPageLoader'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ConfirmEmail from './pages/ConfirmEmail'
import CollegeAdminApp from './pages/collegeAdmin/CollegeAdminApp'
import CollegeRepApp from './pages/collegeRep/CollegeRepApp'

const AppRoutes = () => {
  const { user, loading } = useAuth()
  const roleHomePaths = {
    student: '/dashboard',
    college_admin: '/collegeadmin',
    college_rep: '/collegerep'
  }
  const homePath = user?.homePath ?? roleHomePaths[user?.role] ?? '/dashboard'

  if (loading) {
    return <FullPageLoader message="Preparing your experience..." />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? homePath : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to={homePath} replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={homePath} replace /> : <Signup />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route
        path="/dashboard/*"
        element={user
          ? user.role === 'student'
            ? <Dashboard />
            : <Navigate to={homePath} replace />
          : <Navigate to="/login" replace />}
      />
      <Route
        path="/collegeadmin/*"
        element={user
          ? user.role === 'college_admin'
            ? <CollegeAdminApp />
            : <Navigate to={homePath} replace />
          : <Navigate to="/login" replace />}
      />
      <Route
        path="/collegerep/*"
        element={user
          ? user.role === 'college_rep'
            ? <CollegeRepApp />
            : <Navigate to={homePath} replace />
          : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={user ? homePath : '/login'} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardDataProvider>
          <Router>
            <AppRoutes />
          </Router>
        </DashboardDataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App