import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Bell,
  MessageCircle,
  User,
  Bookmark,
  Settings,
  PlusCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../ui/button";
import useAuth from "../../hooks/useAuth";


const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-full max-w-62 flex-col justify-between lg:flex px-2">
      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                `group flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px]
              font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500`,
                isActive
                  ? `bg-violet-200 text-violet-600 dark:bg-blue-700 dark:text-violet-200`
                  : `
                text-gray-600
                hover:bg-gray-200
                hover:text-gray-950
                dark:text-gray-400
                dark:hover:bg-blue-800
                dark:hover:text-white
              `
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={21}
                  className={cn(
                    `shrink-0
                  transition-transform
                  duration-200
                  group-hover:scale-110
                `,
                    isActive
                      ? 'text-violet-600 dark:text-white '
                      : 'text-gray-500 dark:text-gray-400 '
                  )}
                />

                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              `group flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
          `,
              isActive
                ? `
              bg-violet-200
              text-violet-600

              dark:bg-blue-700
              dark:text-violet-200
            `
                : `
              text-gray-600
              hover:bg-gray-200
              hover:text-gray-950
              dark:text-gray-400
              dark:hover:bg-blue-800
              dark:hover:text-white
            `
            )
          }
        >
          <Settings
            size={21}
            className="shrink-0 transition-transform duration-200 group-hover:scale-110"
          />

          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        {/* New Post */}
        <Button
          variant="gradient"
          size="lg"
          className="w-full shadow-lg shadow-violet-500/20"
        >
          <PlusCircle size={18} />
          New post
        </Button>

        {/* User Profile */}
        <NavLink
          to="/profile"
          className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <img
            src={user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name
                  )}&background=0ea5e9&color=fff&size=256`
                }
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-violet-200 transition-all duration-200 group-hover:ring-violet-500 dark:ring-violet-900 dark:group-hover:ring-violet-400"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>

            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {user?.handle}
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}
