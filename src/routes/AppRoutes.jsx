import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Layouts
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

// Route Guards
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import PublicRoute from './PublicRoute'

// Auth
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

// User
import Home from '../pages/user/Home'
import Explore from '../pages/user/Explore'
import Message from '../pages/user/Message'
import Notifications from '../pages/user/Notifications'
import Profile from '../pages/user/Profile'
import Saved from '../pages/user/Saved'
import Settings from '../pages/user/Settings'

// Admin
import Dashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import Posts from '../pages/admin/Posts'
import Reports from '../pages/admin/Reports'
import Analytics from '../pages/admin/Analytics'
import AdminSettings from '../pages/admin/Settings'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ================= */}

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ================= USER ================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* / → /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home />} />

            <Route path="/explore" element={<Explore />} />

            <Route path="/messages" element={<Message />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/saved" element={<Saved />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ================= ADMIN ================= */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/users" element={<Users />} />

            <Route path="/admin/posts" element={<Posts />} />

            <Route path="/admin/reports" element={<Reports />} />

            <Route path="/admin/analytics" element={<Analytics />} />

            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* ================= 404 ================= */}

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
