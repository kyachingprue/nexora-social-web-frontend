import { Bell, Lock, Palette, User, LogOut, LoaderCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import ThemeToggle from '../../components/navbar/ThemeToggle'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

export default function Settings() {
  const { theme } = useTheme()
  const { logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
      setLoggingOut(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* PAGE TITLE */}
      <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>

      {/*  APPEARANCE */}
      <Card className="border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <Palette size={18} className="text-violet-600 dark:text-violet-400" />

          <CardTitle className="text-base text-gray-900 dark:text-white">
            Appearance
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between border-t pt-4 border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Theme
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Currently using {theme === 'dark' ? 'dark' : 'light'} mode
            </p>
          </div>

          <ThemeToggle />
        </CardContent>
      </Card>

      {/*  NOTIFICATIONS */}
      <Card className="border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <Bell size={18} className="text-violet-600 dark:text-violet-400" />

          <CardTitle className="text-base text-gray-900 dark:text-white">
            Notifications
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 border-t pt-4 border-gray-200 dark:border-gray-800">
          {[
            'Likes and reactions',
            'Comments',
            'New followers',
            'Direct messages'
          ].map(label => (
            <label
              key={label}
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
            >
              {label}

              <input
                type="checkbox"
                defaultChecked
                className="
              h-4
              w-4
              cursor-pointer
              rounded
              border

              border-gray-300
              accent-violet-600

              dark:border-gray-600
              dark:accent-violet-500
            "
              />
            </label>
          ))}
        </CardContent>
      </Card>

      {/* PRIVAC */}
      <Card
        className="
      border
      border-gray-200
      bg-white
      text-gray-900
      shadow-sm

      dark:border-gray-800
      dark:bg-gray-950
      dark:text-white
    "
      >
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <Lock
            size={18}
            className="
          text-violet-600

          dark:text-violet-400
        "
          />

          <CardTitle
            className="
          text-base
          text-gray-900

          dark:text-white
        "
          >
            Privacy
          </CardTitle>
        </CardHeader>

        <CardContent
          className="
        flex
        flex-col
        gap-3
        border-t
        pt-4

        border-gray-200

        dark:border-gray-800
      "
        >
          <label
            className="
          flex
          items-center
          justify-between
          text-sm

          text-gray-700

          dark:text-gray-300
        "
          >
            Private account
            <input
              type="checkbox"
              className="
            h-4
            w-4
            cursor-pointer
            rounded
            border

            border-gray-300
            accent-violet-600

            dark:border-gray-600
            dark:accent-violet-500
          "
            />
          </label>

          <label
            className="
          flex
          items-center
          justify-between
          text-sm

          text-gray-700

          dark:text-gray-300
        "
          >
            Show activity status
            <input
              type="checkbox"
              defaultChecked
              className="
            h-4
            w-4
            cursor-pointer
            rounded
            border

            border-gray-300
            accent-violet-600

            dark:border-gray-600
            dark:accent-violet-500
          "
            />
          </label>
        </CardContent>
      </Card>

      {/* =========================
      ACCOUNT
  ========================== */}
      <Card
        className="
      border
      border-gray-200
      bg-white
      text-gray-900
      shadow-sm

      dark:border-gray-800
      dark:bg-gray-950
      dark:text-white
    "
      >
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <User
            size={18}
            className="
          text-violet-600

          dark:text-violet-400
        "
          />

          <CardTitle className="text-base text-gray-900 dark:text-white">
            Account
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 border-t pt-4 text-sm border-gray-200 dark:border-gray-800">
          <button
            type="button"
            className="text-left text-gray-700 transition-colors hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
          >
            Change password
          </button>
          <button
            type="button"
            className="text-left text-gray-700 transition-colors hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
          >
            Download your data
          </button>
          <button
            type="button"
            className="text-left text-red-600 transition-opacity hover:opacity-70 dark:text-red-400"
          >
            Deactivate account
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="group relative w-44 flex items-center gap-3 overflow-hidden rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-900/50 dark:bg-gray-900 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/40"
          >
            {/* Hover background */}
            <span
              className="absolute inset-0 -translate-x-full bg-linear-to-r from-red-500 to-rose-500 transition-transform duration-300 group-hover:translate-x-0"/>

            {/* Icon */}
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white dark:bg-red-950 dark:group-hover:bg-white/20">
              {loggingOut ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <LogOut
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              )}
            </span>

            {/* Text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {loggingOut ? 'Logging out...' : 'Log out'}
            </span>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
