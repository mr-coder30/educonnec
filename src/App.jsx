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
  const homePath = user?.role === 'representative' ? '/collegerep' : '/dashboard'

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
          ? user.role === 'representative'
            ? <Navigate to="/collegerep" replace />
            : <Dashboard />
          : <Navigate to="/login" replace />}
      />
      <Route path="/collegeadmin/*" element={<CollegeAdminApp />} />
      <Route
        path="/collegerep/*"
        element={user
          ? <CollegeRepApp />
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