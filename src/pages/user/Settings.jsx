import { Bell, Lock, Palette, User } from 'lucide-react'

import { useTheme } from '../../context/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import ThemeToggle from '../../components/navbar/ThemeToggle'

export default function Settings() {
  const { theme } = useTheme()

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
        </CardContent>
      </Card>
    </div>
  )
}
