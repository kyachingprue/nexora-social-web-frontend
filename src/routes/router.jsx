import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AdminRoute from './AdminRoute'

// User pages
import Home from '../pages/user/Home'
import Explore from '../pages/user/Explore'
import Notifications from '../pages/user/Notifications'
import Messages from '../pages/user/Messages'
import Profile from '../pages/user/Profile'
import Settings from '../pages/user/Settings'
import Saved from '../pages/user/Saved'

// Auth pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgetPassword from '../pages/auth/ForgetPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminPosts from '../pages/admin/AdminPosts'
import AdminReports from '../pages/admin/AdminReports'
import AdminAnalytics from '../pages/admin/AdminAnalytics'
import AdminSettings from '../pages/admin/AdminSettings'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // PUBLIC ROUTES
      {
        element: <PublicRoute />,

        children: [
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/forget-password',
            element: <ForgetPassword />
          },
          {
            path: '/reset-password',
            element: <ResetPassword />
          },
          {
            path: '/verify-email',
            element: <VerifyEmail />
          }
        ]
      },
      // PROTECTED USER ROUTES
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <MainLayout />,

            children: [
              {
                path: '/',
                index: true,
                element: <Home />
              },
              {
                path: '/explore',
                element: <Explore />
              },
              {
                path: '/notifications',
                element: <Notifications />
              },
              {
                path: '/messages',
                element: <Messages />
              },
              {
                path: '/profile',
                element: <Profile />
              },
              {
                path: '/profile/:username',
                element: <Profile />
              },
              {
                path: '/settings',
                element: <Settings />
              },
              {
                path: '/saved',
                element: <Saved />
              }
            ]
          },
          // ADMIN ROUTES
          {
            path: '/admin',
            element: <AdminRoute />,

            children: [
              {
                element: <AdminLayout />,

                children: [
                  {
                    index: true,
                    element: <AdminDashboard />
                  },
                  {
                    path: 'dashboard',
                    element: <AdminDashboard />
                  },
                  {
                    path: 'users',
                    element: <AdminUsers />
                  },
                  {
                    path: 'posts',
                    element: <AdminPosts />
                  },
                  {
                    path: 'reports',
                    element: <AdminReports />
                  },
                  {
                    path: 'analytics',
                    element: <AdminAnalytics />
                  },
                  {
                    path: 'settings',
                    element: <AdminSettings />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])

export default router
