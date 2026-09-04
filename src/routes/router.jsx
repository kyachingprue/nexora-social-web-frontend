import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

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
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import RootLayout from '../layouts/RootLayout'
import ForgetPassword from '../pages/auth/ForgetPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <Home />
              },
              {
                path: 'explore',
                element: <Explore />
              },
              {
                path: 'notifications',
                element: <Notifications />
              },
              {
                path: 'messages',
                element: <Messages />
              },
              {
                path: 'profile',
                element: <Profile />
              },
              {
                path: 'profile/:username',
                element: <Profile />
              },
              {
                path: 'settings',
                element: <Settings />
              },
              {
                path: 'saved',
                element: <Saved />
              }
            ]
          }
        ]
      },

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
            path: "/forget-password",
            element:<ForgetPassword/>
          },
          {
            path: "/reset-password",
            element:<ResetPassword/>
          },
          {
            path: "/verify-email",
            element:<VerifyEmail/>
          }
        ]
      }
    ]
  }
])

export default router
