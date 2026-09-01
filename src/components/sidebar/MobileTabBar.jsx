import { NavLink } from "react-router";
import { Home, Compass, PlusCircle, Settings, User } from "lucide-react";
import { cn } from "../../lib/utils";


const links = [
  { to: "/", icon: Home, end: true },
  { to: "/explore", icon: Compass },
  { to: "/", icon: PlusCircle, isCta: true },
  { to: "/settings", icon: Settings },
  { to: "/profile", icon: User },
];

export default function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95 lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map(({ to, icon: Icon, end, isCta }, i) => (
          <NavLink
            key={`${to}-${i}`}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(`grid h-11 w-11 place-items-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500`,isCta ? ` bg-linear-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:scale-105 hover:shadow-violet-500/40`: isActive ? ` bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400`: ` text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800`)
            }
          >
            <Icon size={22} strokeWidth={1.9} />
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
